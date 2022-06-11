import "dotenv-safe/config";
import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import path from "path";
import { __prod__, __test__ } from "./utils/constants";
import { TSMigrationGenerator } from "@mikro-orm/migrations";

import { User } from "./db/entities";

export default {
  name: "JWT Auth Starter",
  dbName: process.env.DB_NAME,
  type: "postgresql",
  driver: PostgreSqlDriver,
  debug: true,
  metadataProvider: ReflectMetadataProvider,
  highlighter: new SqlHighlighter(),
  entities: [User],
  migrations: {
    path: path.join(__dirname, "./db/migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
    transactional: true,
    emit: "ts",
    generator: TSMigrationGenerator,
    dropTables: true,
    safe: false,
  },
} as Options<PostgreSqlDriver>;
