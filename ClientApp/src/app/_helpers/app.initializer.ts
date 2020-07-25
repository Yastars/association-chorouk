import { AuthService } from '../services/auth.service';


export function appInitializer(authService: AuthService) {
    return () => new Promise( resolve => {
        // refresh token on start to auto authenticate
        try {
            authService.refreshToken().subscribe().add(resolve);
        } catch (error) {
            resolve();
        }
        
    }

    );
}