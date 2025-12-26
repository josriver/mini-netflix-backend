#!/bin/bash

API_URL="http://localhost:3000"

echo "🎬 Probando Mini-Netflix API"
echo "============================"
echo ""

# 1. Verificar que la API esté corriendo
echo "1️⃣ Verificando estado de la API..."
curl -s $API_URL/health | jq '.'
echo ""
echo ""

# 2. Registrar un usuario
echo "2️⃣ Registrando usuario..."
curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "123456"
  }' | jq '.'
echo ""
echo ""

# 3. Login
echo "3️⃣ Haciendo login..."
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "123456"
  }')

echo $LOGIN_RESPONSE | jq '.'
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.access_token')
echo ""
echo "✅ Token obtenido: ${TOKEN:0:50}..."
echo ""
echo ""

# 4. Crear una serie (requiere autenticación)
echo "4️⃣ Creando serie 'Breaking Bad'..."
SERIE_RESPONSE=$(curl -s -X POST $API_URL/series \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "titulo": "Breaking Bad",
    "genero": "Drama",
    "sinopsis": "Un profesor de química se convierte en fabricante de metanfetaminas",
    "urlPortada": "https://example.com/breaking-bad.jpg"
  }')

echo $SERIE_RESPONSE | jq '.'
SERIE_ID=$(echo $SERIE_RESPONSE | jq -r '.id')
echo ""
echo ""

# 5. Listar todas las series (público)
echo "5️⃣ Listando todas las series (público)..."
curl -s $API_URL/series | jq '.'
echo ""
echo ""

# 6. Crear un episodio (requiere autenticación)
echo "6️⃣ Creando episodio para la serie..."
curl -s -X POST $API_URL/episodios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"titulo\": \"Pilot\",
    \"duracion\": 58,
    \"numeroCapitulo\": 1,
    \"serieId\": $SERIE_ID
  }" | jq '.'
echo ""
echo ""

# 7. Listar todos los episodios (público)
echo "7️⃣ Listando todos los episodios (público)..."
curl -s $API_URL/episodios | jq '.'
echo ""
echo ""

# 8. Ver una serie específica con sus episodios
echo "8️⃣ Viendo serie $SERIE_ID con episodios anidados..."
curl -s $API_URL/series/$SERIE_ID | jq '.'
echo ""
echo ""

# 9. Intentar crear sin token (debe fallar)
echo "9️⃣ Intentando crear serie sin token (debe dar 401)..."
curl -s -X POST $API_URL/series \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Test",
    "genero": "Test",
    "sinopsis": "Test",
    "urlPortada": "https://example.com/test.jpg"
  }' | jq '.'
echo ""
echo ""

echo "✅ Pruebas completadas!"
