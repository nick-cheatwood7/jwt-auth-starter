import { Migration } from '@mikro-orm/migrations';

export class Migration20220612210631 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "last_login" timestamptz(0) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "last_login";');
  }

}
