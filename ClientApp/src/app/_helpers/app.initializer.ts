import { AuthService } from '../services/auth.service';


export function appInitializer(authService: AuthService) {
    return () => new Promise( resolve => {
        // refresh token on start to auto authenticate
        try {
            let connectedUser = authService.userValue;
            if(!connectedUser)
                authService.refreshUserFromLocal();
            authService.refreshToken().subscribe().add(
                authService.getCurrentUserByAccess().subscribe().add(resolve)
            )
        } catch (error) {
            resolve();
        }
        
    }

    );
}