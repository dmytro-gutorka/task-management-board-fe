import {
    type CredentialResponse,
    type GsiButtonConfiguration,
    GoogleLogin,
} from '@react-oauth/google';
import { toast } from 'sonner';

interface GoogleAuthButtonProps {
    onCredential: (credential: string) => Promise<void> | void;
    text?: GsiButtonConfiguration['text'];
}

export function GoogleAuthButton({ onCredential, text = 'continue_with' }: GoogleAuthButtonProps) {
    function handleSuccess(credentialResponse: CredentialResponse) {
        if (!credentialResponse.credential) {
            toast.error('Google credential was not received');
            return;
        }

        void onCredential(credentialResponse.credential);
    }
    return (
        <GoogleLogin
            shape="square"
            text={text}
            width="100%"
            onSuccess={(credentialResponse) => handleSuccess(credentialResponse)}
            onError={() => toast.error('Google authentication failed')}
        />
    );
}
