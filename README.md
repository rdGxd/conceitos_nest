# 🏗️ Estrutura de Projeto NestJS - Melhores Práticas

Esta é a estrutura recomendada para projetos NestJS escaláveis e maintíveis.

## 📁 Estrutura Completa

```
project-name/
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 nest-cli.json
├── 📄 .env / .env.example
├── 📄 .gitignore
├── 📄 README.md
├── 📄 docker-compose.yml
├── 📄 Dockerfile
├── 🗂️ src/
│   ├── 📄 main.ts                    # Entry point da aplicação
│   ├── 📄 app.module.ts              # Módulo raiz
│   ├── 📄 app.controller.ts          # Controller raiz (health check)
│   ├── 📄 app.service.ts             # Service raiz
│   ├── 🗂️ config/                    # Configurações
│   │   ├── 📄 database.config.ts     # Config do banco de dados
│   │   ├── 📄 app.config.ts          # Config geral da app
│   │   ├── 📄 jwt.config.ts          # Config JWT
│   │   └── 📄 redis.config.ts        # Config Redis/Cache
│   ├── 🗂️ common/                    # Recursos compartilhados
│   │   ├── 🗂️ decorators/            # Decorators customizados
│   │   │   ├── 📄 roles.decorator.ts
│   │   │   ├── 📄 public.decorator.ts
│   │   │   └── 📄 current-user.decorator.ts
│   │   ├── 🗂️ dto/                   # DTOs globais
│   │   │   ├── 📄 pagination.dto.ts
│   │   │   ├── 📄 response.dto.ts
│   │   │   └── 📄 query-options.dto.ts
│   │   ├── 🗂️ entities/              # Entidades base
│   │   │   └── 📄 base.entity.ts
│   │   ├── 🗂️ enums/                 # Enums globais
│   │   │   ├── 📄 user-role.enum.ts
│   │   │   └── 📄 status.enum.ts
│   │   ├── 🗂️ exceptions/            # Exceções customizadas
│   │   │   ├── 📄 custom-exception.filter.ts
│   │   │   ├── 📄 http-exception.filter.ts
│   │   │   └── 📄 validation-exception.filter.ts
│   │   ├── 🗂️ guards/                # Guards globais
│   │   │   ├── 📄 jwt-auth.guard.ts
│   │   │   ├── 📄 roles.guard.ts
│   │   │   └── 📄 local-auth.guard.ts
│   │   ├── 🗂️ interceptors/          # Interceptors globais
│   │   │   ├── 📄 logging.interceptor.ts
│   │   │   ├── 📄 transform.interceptor.ts
│   │   │   └── 📄 timeout.interceptor.ts
│   │   ├── 🗂️ middlewares/           # Middlewares globais
│   │   │   ├── 📄 logger.middleware.ts
│   │   │   ├── 📄 cors.middleware.ts
│   │   │   └── 📄 rate-limit.middleware.ts
│   │   ├── 🗂️ pipes/                 # Pipes customizados
│   │   │   ├── 📄 validation.pipe.ts
│   │   │   ├── 📄 parse-uuid.pipe.ts
│   │   │   └── 📄 transform.pipe.ts
│   │   ├── 🗂️ strategies/            # Strategies de autenticação
│   │   │   ├── 📄 jwt.strategy.ts
│   │   │   ├── 📄 local.strategy.ts
│   │   │   └── 📄 google.strategy.ts
│   │   └── 🗂️ utils/                 # Utilitários globais
│   │       ├── 📄 bcrypt.util.ts
│   │       ├── 📄 date.util.ts
│   │       └── 📄 file.util.ts
│   ├── 🗂️ database/                  # Configurações de banco
│   │   ├── 🗂️ migrations/            # Migrações do banco
│   │   ├── 🗂️ seeds/                 # Seeds de dados
│   │   └── 🗂️ factories/             # Factories para testes
│   ├── 🗂️ modules/                   # Módulos da aplicação
│   │   ├── 🗂️ auth/                  # Módulo de autenticação
│   │   │   ├── 📄 auth.module.ts
│   │   │   ├── 📄 auth.controller.ts
│   │   │   ├── 📄 auth.service.ts
│   │   │   ├── 🗂️ dto/
│   │   │   │   ├── 📄 login.dto.ts
│   │   │   │   ├── 📄 register.dto.ts
│   │   │   │   └── 📄 reset-password.dto.ts
│   │   │   └── 🗂️ strategies/
│   │   │       ├── 📄 jwt.strategy.ts
│   │   │       └── 📄 local.strategy.ts
│   │   ├── 🗂️ users/                 # Módulo de usuários
│   │   │   ├── 📄 users.module.ts
│   │   │   ├── 📄 users.controller.ts
│   │   │   ├── 📄 users.service.ts
│   │   │   ├── 📄 users.repository.ts
│   │   │   ├── 🗂️ dto/
│   │   │   │   ├── 📄 create-user.dto.ts
│   │   │   │   ├── 📄 update-user.dto.ts
│   │   │   │   ├── 📄 user-response.dto.ts
│   │   │   │   └── 📄 user-query.dto.ts
│   │   │   ├── 🗂️ entities/
│   │   │   │   └── 📄 user.entity.ts
│   │   │   ├── 🗂️ interfaces/
│   │   │   │   ├── 📄 user.interface.ts
│   │   │   │   └── 📄 users-repository.interface.ts
│   │   │   └── 🗂️ tests/
│   │   │       ├── 📄 users.controller.spec.ts
│   │   │       ├── 📄 users.service.spec.ts
│   │   │       └── 📄 users.e2e-spec.ts
│   │   ├── 🗂️ posts/                 # Módulo de posts
│   │   │   ├── 📄 posts.module.ts
│   │   │   ├── 📄 posts.controller.ts
│   │   │   ├── 📄 posts.service.ts
│   │   │   ├── 📄 posts.repository.ts
│   │   │   ├── 🗂️ dto/
│   │   │   ├── 🗂️ entities/
│   │   │   ├── 🗂️ interfaces/
│   │   │   └── 🗂️ tests/
│   │   ├── 🗂️ comments/              # Módulo de comentários
│   │   ├── 🗂️ notifications/         # Módulo de notificações
│   │   ├── 🗂️ files/                 # Módulo de arquivos
│   │   └── 🗂️ admin/                 # Módulo administrativo
│   ├── 🗂️ shared/                    # Módulos compartilhados
│   │   ├── 🗂️ cache/                 # Módulo de cache
│   │   │   ├── 📄 cache.module.ts
│   │   │   ├── 📄 cache.service.ts
│   │   │   └── 📄 redis.service.ts
│   │   ├── 🗂️ email/                 # Módulo de email
│   │   │   ├── 📄 email.module.ts
│   │   │   ├── 📄 email.service.ts
│   │   │   └── 🗂️ templates/
│   │   ├── 🗂️ upload/                # Módulo de upload
│   │   │   ├── 📄 upload.module.ts
│   │   │   ├── 📄 upload.service.ts
│   │   │   └── 📄 multer.config.ts
│   │   └── 🗂️ queue/                 # Módulo de filas
│   │       ├── 📄 queue.module.ts
│   │       ├── 📄 queue.service.ts
│   │       └── 🗂️ processors/
│   └── 🗂️ utils/                     # Utilitários da aplicação
│       ├── 🗂️ mappers/               # Mappers de dados
│       │   ├── 📄 user.mapper.ts
│       │   ├── 📄 post.mapper.ts
│       │   └── 📄 base.mapper.ts
│       ├── 🗂️ validators/            # Validadores customizados
│       │   ├── 📄 is-unique.validator.ts
│       │   ├── 📄 is-exists.validator.ts
│       │   └── 📄 custom-validators.ts
│       └── 🗂️ helpers/               # Funções auxiliares
│           ├── 📄 string.helper.ts
│           ├── 📄 array.helper.ts
│           └── 📄 date.helper.ts
├── 🗂️ test/                          # Testes
│   ├── 📄 app.e2e-spec.ts
│   ├── 📄 jest-e2e.json
│   ├── 🗂️ fixtures/                  # Dados de teste
│   ├── 🗂️ mocks/                     # Mocks para testes
│   └── 🗂️ utils/                     # Utilitários de teste
├── 🗂️ docs/                          # Documentação
│   ├── 📄 api.md                     # Documentação da API
│   ├── 📄 deployment.md              # Guia de deploy
│   └── 📄 development.md             # Guia de desenvolvimento
├── 🗂️ scripts/                       # Scripts de automação
│   ├── 📄 build.sh
│   ├── 📄 deploy.sh
│   └── 📄 migration.sh
└── 🗂️ public/                        # Arquivos estáticos
    ├── 🗂️ uploads/                   # Uploads de usuários
    └── 🗂️ assets/                    # Assets estáticos
```

## 🎯 Princípios da Estrutura

### 1. **Separação por Domínio** 📦

- Cada módulo representa um domínio de negócio
- Responsabilidades bem definidas
- Baixo acoplamento entre módulos

### 2. **Estrutura Consistente** 🔄

```
module-name/
├── module-name.module.ts      # Configuração do módulo
├── module-name.controller.ts  # Endpoints HTTP
├── module-name.service.ts     # Lógica de negócio
├── module-name.repository.ts  # Acesso a dados (opcional)
├── dto/                       # Data Transfer Objects
├── entities/                  # Entidades do banco
├── interfaces/                # Contratos TypeScript
└── tests/                     # Testes do módulo
```

### 3. **Camadas Bem Definidas** 🏗️

```
Controller → Service → Repository → Database
     ↓         ↓           ↓
   DTOs    Entities    Interfaces
```

## 🚀 Configurações Recomendadas

### **tsconfig.json**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2020",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@common/*": ["src/common/*"],
      "@modules/*": ["src/modules/*"],
      "@shared/*": ["src/shared/*"],
      "@config/*": ["src/config/*"],
      "@utils/*": ["src/utils/*"]
    },
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": false
  }
}
```

### **nest-cli.json**

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "webpack": true,
    "tsConfigPath": "tsconfig.build.json"
  },
  "projects": {
    "api": {
      "type": "application",
      "root": ".",
      "entryFile": "main",
      "sourceRoot": "src",
      "compilerOptions": {
        "tsConfigPath": "tsconfig.build.json"
      }
    }
  }
}
```

## 📋 Convenções de Nomenclatura

### **Arquivos**

```
kebab-case.type.ts
```

- `user.entity.ts`
- `create-user.dto.ts`
- `users.controller.ts`
- `jwt-auth.guard.ts`

### **Classes**

```
PascalCase + Suffix
```

- `UserEntity`
- `CreateUserDto`
- `UsersController`
- `JwtAuthGuard`

### **Métodos e Variáveis**

```
camelCase
```

- `findUserById()`
- `createNewUser()`
- `isEmailValid`

### **Constantes**

```
SCREAMING_SNAKE_CASE
```

- `JWT_SECRET`
- `DATABASE_URL`
- `MAX_FILE_SIZE`

## 🛡️ Segurança e Validação

### **Environment Variables**

```typescript
// config/app.config.ts
export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
});
```

### **Global Validation Pipe**

```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);
```

## 🧪 Estrutura de Testes

### **Tipos de Teste**

```
unit tests          → *.spec.ts
integration tests   → *.integration.spec.ts
e2e tests          → *.e2e-spec.ts
```

### **Organização**

```
src/modules/users/
├── users.service.ts
├── tests/
│   ├── users.service.spec.ts      # Unit tests
│   ├── users.controller.spec.ts   # Unit tests
│   ├── users.integration.spec.ts  # Integration tests
│   └── users.e2e-spec.ts         # E2E tests
```

## 📦 Scripts Package.json Recomendados

```json
{
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "migration:generate": "typeorm migration:generate",
    "migration:run": "typeorm migration:run",
    "migration:revert": "typeorm migration:revert",
    "seed:run": "ts-node src/database/seeds/run-seeds.ts"
  }
}
```

## 🔥 Dicas de Boas Práticas

### 1. **Use Interfaces para Contratos**

```typescript
export interface IUserRepository {
  findById(id: string): Promise<User>;
  create(user: CreateUserDto): Promise<User>;
  update(id: string, user: UpdateUserDto): Promise<User>;
}
```

### 2. **Implemente Repository Pattern**

```typescript
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
}
```

### 3. **Use Mappers para Transformações**

```typescript
export class UserMapper {
  static toDto(entity: User): UserResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
    };
  }
}
```

### 4. **Configure Global Exception Filter**

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Handle all exceptions
  }
}
```

### 5. **Use Interceptors para Logging**

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(`${request.method} ${request.url}`);
    return next.handle();
  }
}
```

---

## 🎯 Benefícios desta Estrutura

✅ **Escalabilidade** - Fácil adicionar novos módulos
✅ **Manutenibilidade** - Código organizado e previsível
✅ **Testabilidade** - Estrutura clara para testes
✅ **Reutilização** - Componentes compartilhados bem organizados
✅ **Padrões** - Convenções consistentes em todo projeto
✅ **Performance** - Imports organizados e tree-shaking otimizado

Esta estrutura é baseada nas melhores práticas da comunidade NestJS e pode ser adaptada conforme as necessidades específicas do seu projeto! 🚀
