/**
 * Authentication Middleware
 * Handles JWT validation and session management
 */

import { AuthUserSession } from '../../types/auth-types';
import { createLogger } from '../../logger';
import { AuthService } from '../../database/services/AuthService';
import { extractToken } from '../../utils/authUtils';

const logger = createLogger('AuthMiddleware');
/**
 * Validate JWT token and return user
 */
export async function validateToken(
    token: string,
    env: Env
): Promise<AuthUserSession | null> {
    try {
        // Use AuthService for token validation and user retrieval
        const authService = new AuthService(env);
        return authService.validateTokenAndGetUser(token, env);
    } catch (error) {
        logger.error('Token validation error', error);
        return null;
    }
}

/**
 * Authentication middleware
 */
export async function authMiddleware(
    request: Request,
    env: Env
): Promise<AuthUserSession | null> {
    try {
        logger.info('🔍 DEBUG: Auth middleware starting');
        
        // Extract token
        const token = extractToken(request);
        
        if (token) {
            logger.info('✅ DEBUG: Token found, validating', { tokenLength: token.length });
            const userResponse = await validateToken(token, env);
            if (userResponse) {
                logger.info('🎉 DEBUG: User authenticated successfully', { userId: userResponse.user.id, email: userResponse.user.email });
                return userResponse;
            } else {
                logger.warn('🚨 DEBUG: Token validation failed');
            }
        } else {
            logger.info('🚨 DEBUG: No token found in request');
        }
        
        logger.info('❌ DEBUG: Authentication failed - no valid session');
        return null;
    } catch (error) {
        logger.error('❌ DEBUG: Auth middleware error', { error: error.message, stack: error.stack });
        return null;
    }
}
