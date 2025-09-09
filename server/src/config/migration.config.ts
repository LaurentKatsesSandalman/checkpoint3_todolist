//importe la classe DataSource de la bibliothèque typeorm
import { DataSource } from 'typeorm';
//importation fichier de configuration de la bdd
import { getDatabaseConfig } from './database.config';

//instanciation de la class datasource avec le mot clé new
export default new DataSource({
  // spread operator est utilisé ici pour inclure toutes les propriétés de l'objet databaseConfig
  ...getDatabaseConfig,
  // indique que tous les fichiers TypeScript du répertoire des migrations doivent être inclus
  migrations: [__dirname + '/../migrations/*.ts'],
});