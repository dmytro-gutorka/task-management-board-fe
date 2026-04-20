import type { AppEnv } from '@/app/env/env-schema';

interface ImportMetaEnv extends AppEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
