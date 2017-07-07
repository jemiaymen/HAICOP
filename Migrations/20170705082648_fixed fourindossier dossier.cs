using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixedfourindossierdossier : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nature",
                table: "Mail");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Mail");

            migrationBuilder.DropColumn(
                name: "Month",
                table: "Dossier");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Dossier");

            migrationBuilder.AddColumn<int>(
                name: "MailNature",
                table: "Mail",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MailType",
                table: "Mail",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Foreign",
                table: "FourInDossier",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "Dossier",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Lbl",
                table: "FourInDossier",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MailNature",
                table: "Mail");

            migrationBuilder.DropColumn(
                name: "MailType",
                table: "Mail");

            migrationBuilder.DropColumn(
                name: "Foreign",
                table: "FourInDossier");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Dossier");

            migrationBuilder.AddColumn<int>(
                name: "Nature",
                table: "Mail",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Mail",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "Dossier",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Dossier",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Lbl",
                table: "FourInDossier",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 200);
        }
    }
}
