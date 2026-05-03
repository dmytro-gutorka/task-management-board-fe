import { AppEnv } from '../../infrastructure/env/model/env.types.ts';

interface ImportMetaEnv extends AppEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
