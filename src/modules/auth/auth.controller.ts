import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    SerializeOptions,
    UnauthorizedException,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import AuthService from "@modules/auth/auth.service";
import { Auth } from "@decorators/auth.decorator";
import { RefreshTokenDto } from "@modules/auth/dto/refresh-token.dto";
import { UserLoginDto } from "@modules/auth/dto/user-login.dto";
import { UserRegisterDto } from "@modules/auth/dto/user-register.dto";
import { AuthUser } from "@decorators/auth-user.decorator";
import { User } from "@modules/users/entities/user.entity";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { DecodedUser } from "@modules/auth/interfaces/decoded-user.interface";
import { UserDto } from "@modules/auth/dto/user.dto";
import { ExcludeAttributesFromEntity } from "@modules/base.entity";
import JwtTokenInterface from "@modules/auth/interfaces/jwt-token.interface";
import ForgotPasswordDto from "@modules/auth/dto/forgot-password.dto";
import UsersService from "@modules/users/users.service";
import AuthEntity from "@modules/auth/entities/auth.entity";
import ResetPasswordDto from "./dto/reset-password.dto";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags("Auth")
@ApiInternalServerErrorResponse({ description: "Internal Server Error" })
export default class AuthController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private authRepository: AuthEntity
    ) {
        // TODO::
    }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    @ApiOkResponse({ description: "Ok" })
    async login(@Body() userLoginDto: UserLoginDto, @AuthUser() user: User): Promise<UserDto> {
        const payload = {
            id: user.userId,
            email: user.email
        };

        const accessToken = await this.authService.login(payload);

        return new UserDto(user, accessToken);
    }

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    @ApiCreatedResponse({ description: "Created" })
    async register(@Body() userRegisterDto: UserRegisterDto): Promise<any> {
        const createdUser = await this.authService.create(userRegisterDto);

        const payload = {
            id: createdUser.userId,
            email: createdUser.email
        };

        const accessToken = await this.authService.login(payload);

        return new UserDto(createdUser, accessToken);
    }

    @Post("forgot-password")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: "Ok" })
    async forgotPassword(@Body() { email }: ForgotPasswordDto): Promise<any> {
        const foundUser = await this.userService.findOneByEmailOrFail(email);

        const payload = {
            id: foundUser?.userId,
            email: foundUser?.email
        };
        const accessToken = this.authService.createVerificationAccessToken(payload);

        await this.authRepository.addVerificationToken(payload.email as string, accessToken);
    }

    @Get("verify/:token")
    @ApiOkResponse({ description: "Ok" })
    async verifyUser(@Param("token") token: string): Promise<any> {
        const decodedUser: DecodedUser | null = await this.authService.verifyToken(token, <string>this.configService.get("JWT_SECRET"));

        if (!decodedUser) {
            throw new ForbiddenException("Incorrect token");
        }

        const oldToken = await this.authRepository.getVerificationToken(decodedUser.email);

        if (!oldToken || oldToken !== token) {
            throw new UnauthorizedException("Authentication credentials were missing or incorrect");
        }
    }

    @Post("reset-password")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: "Ok" })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
        return this.authService.updatePassword(resetPasswordDto);
    }

    @Post("refresh-token")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: "Ok" })
    async refreshToken(@Body() { refreshToken }: RefreshTokenDto): Promise<JwtTokenInterface> {
        const decodedUser = this.jwtService.decode(refreshToken) as DecodedUser;

        if (!decodedUser) {
            throw new ForbiddenException("Incorrect token");
        }

        const oldRefreshToken: string | null = await this.authService.getRefreshTokenByEmail(decodedUser.email);

        // if the old refresh token is not equal to request refresh token then this user is unauthorized
        if (!oldRefreshToken || oldRefreshToken !== refreshToken) {
            throw new UnauthorizedException("Authentication credentials were missing or incorrect");
        }

        const payload = {
            id: decodedUser.id,
            email: decodedUser.email
        };

        return await this.authService.login(payload);
    }

    @Delete("logout/:token")
    @ApiOkResponse({ description: "Ok" })
    async logout(@Param("token") token: string): Promise<any> {
        const decodedUser: DecodedUser | null = await this.authService.verifyToken(token, <string>this.configService.get("JWT_SECRET"));

        if (!decodedUser) {
            throw new ForbiddenException("Incorrect token");
        }

        const deletedUsersCount = await this.authService.deleteTokenByEmail(decodedUser.email);

        if (deletedUsersCount === 0) {
            throw new NotFoundException();
        }
    }

    @Get("me")
    @Auth()
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    @ApiOkResponse({ description: "Ok" })
    async me(@AuthUser() user: User): Promise<any> {
        return new UserDto(user);
    }
}
