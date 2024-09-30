import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasks1727381992391 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tasks",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    isUnique: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "taskName",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "description",
                    type: "varchar",
                    length: "500",
                    isNullable: true,
                },
                {
                    name: "dueDate",
                    type: "timestamp",
                },
                {
                    name: "statusName",
                    type: "varchar",
                    length: "255",
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks");
    }
}
