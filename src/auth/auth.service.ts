import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users";
import { Repository } from "typeorm";
import jwtConfig from "./config/jwt.config";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { HashingServiceProtocol } from "./hashing/hashing.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingServiceProtocol,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    let passwordIsValid = false;
    let throwError = true;

    const user = await this.userRepository.findOneBy({
      email: loginDto.email,
      isActive: true,
    });

    if (user) {
      passwordIsValid = await this.hashingService.compare(
        loginDto.password,
        user.password,
      );
    }

    if (passwordIsValid) {
      throwError = false;
    }

    if (throwError || !user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return await this.createTokens(user);
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        this.jwtConfiguration,
      );

      const user = await this.userRepository.findOneBy({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: sub,
        isActive: true,
      });

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      return await this.createTokens(user);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new UnauthorizedException(error.message);
    }
  }

  private async createTokens(user: User) {
    const accessTokenPromise = this.signJwtAsync<Partial<User>>(
      user.id,
      this.jwtConfiguration.signOptions.expiresIn,
      { email: user.email },
    );

    const refreshTokenPromise = this.signJwtAsync(
      user.id,
      this.jwtConfiguration.refreshToken,
    );

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signJwtAsync<T>(sub: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.signOptions.audience,
        issuer: this.jwtConfiguration.signOptions.issuer,
        expiresIn,
      },
    );
  }
}
