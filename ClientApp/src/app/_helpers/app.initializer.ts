import { AuthService } from '../services/auth.service';


export function appInitilizer(authService: AuthService) {
    return () => new Promise( resolve => {
        // refresh token on start to auto authenticate
        authService.refreshToken().subscribe().add(resolve);
    }

    );
}