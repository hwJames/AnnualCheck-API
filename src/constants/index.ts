import { SetMetadata } from '@nestjs/common';
import { Role } from '@enums/user.enum';
import { join } from 'path';

// API KEY, Auth 토큰 없이 접근 가능
export const IS_OPEN_KEY = 'isOpen';
export const Open = () => SetMetadata(IS_OPEN_KEY, true);

// Auth 토큰 없이 접근 가능
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const rootPath = join(__dirname, '..', '..');
