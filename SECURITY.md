# Política de Seguridad - PUBLICASA.co

## 🔒 Información Sensible - NUNCA COMMITEAR

Los siguientes archivos **NUNCA** deben ser commiteados a git:

### Variables de Entorno
- `.env` (archivo principal)
- `.env.local` (desarrollo local)
- `.env.production.local` (producción)
- `.env.development.local`
- Cualquier archivo `.env.*.local`

### Credenciales & Secretos
- API keys (Anthropic, OpenAI, Google)
- Contraseñas de base de datos
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_SECRET`
- AWS credentials
- SSH keys (`.ssh/`, `*.pem`, `*.key`)
- `credentials.json` (Google Cloud)

### Archivos del Sistema
- `.DS_Store` (macOS)
- `Thumbs.db` (Windows)
- Node modules (`/node_modules`)
- Build outputs (`/.next`, `/dist`, `/build`)

## ✅ Seguridad en Commits

### Pre-commit Checks
Antes de hacer commit, verifica:

1. **No hay `.env` en staging**
   ```bash
   git status
   ```

2. **No hay archivos sensibles**
   ```bash
   git diff --cached | grep -E "password|secret|api.?key|token"
   ```

3. **Si accidentalmente commiteaste un secreto:**
   ```bash
   # NO hagas push
   # Revierte el commit
   git reset --soft HEAD~1
   # Limpia el archivo
   git restore --staged <archivo>
   ```

## 🚀 Mejor Práctica: Pre-commit Hooks

Instalemos un hook que bloquee commits con secretos:

```bash
npm install -D husky lint-staged
npx husky install
```

Luego crea `.husky/pre-commit`:
```bash
#!/bin/bash
# Bloquea secretos comunes
if git diff --cached | grep -iE "NEXTAUTH_SECRET|GOOGLE_CLIENT_SECRET|DATABASE_URL|password.*="; then
  echo "❌ Error: Detectado secreto en staging. Revierte antes de hacer commit."
  exit 1
fi
```

## 🔐 Variables de Entorno Requeridas

Copia `.env.example` a `.env` y completa:

- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - PostgreSQL direct URL (para migraciones)
- `NEXTAUTH_SECRET` - Generar con: `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` - Google OAuth (opcional)
- `GOOGLE_CLIENT_SECRET` - Google OAuth (opcional)
- `ANTHROPIC_API_KEY` - Claude API (opcional)
- `OPENAI_API_KEY` - OpenAI API (opcional)

**NUNCA** commitees el archivo `.env` con valores reales.

## 📋 Checklist antes de hacer Push

- [ ] No hay `.env` en `git status`
- [ ] No hay `credentials.json` visible
- [ ] No hay API keys en código fuente
- [ ] No hay contraseñas en commits
- [ ] `.gitignore` está actualizado
- [ ] `npm audit` no reporta vulnerabilidades críticas

## 🚨 Si Accidentalmente Commiteaste un Secreto

1. **No hagas push**
2. Revierte el commit:
   ```bash
   git reset --soft HEAD~1
   git restore --staged .env
   ```
3. Cambia la credencial en el servicio real (regenera keys, passwords)
4. Haz un nuevo commit sin el secreto
5. Si ya hiciste push: contacta al admin para eliminar el commit del histórico

## 🔗 Referencias

- [OWASP: Secrets Management](https://owasp.org/www-project-secure-coding-practices/)
- [GitHub: Managing sensitive data](https://docs.github.com/en/code-security/secret-scanning)
- [Prisma: Environment Variables](https://www.prisma.io/docs/concepts/components/prisma-client/environment-variables)

---

**Última actualización**: 2026-09-19
