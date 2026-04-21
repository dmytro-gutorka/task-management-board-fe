import { AppEnv } from '@/app/env/env.types';

interface ImportMetaEnv extends AppEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
