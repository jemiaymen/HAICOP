using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixedmailanddossier : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RecepDate",
                table: "Mail",
                newName: "MailDate");

            migrationBuilder.AddColumn<string>(
                name: "From",
                table: "Mail",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Nature",
                table: "Mail",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "OriginRef",
                table: "Mail",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Mail",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EnterDate",
                table: "Dossier",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ProDate",
                table: "Dossier",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MailDate",
                table: "Mail",
                newName: "RecepDate");

            migrationBuilder.DropColumn(
                name: "From",
                table: "Mail");

            migrationBuilder.DropColumn(
                name: "Nature",
                table: "Mail");

            migrationBuilder.DropColumn(
                name: "OriginRef",
                table: "Mail");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Mail");

            migrationBuilder.DropColumn(
                name: "EnterDate",
                table: "Dossier");

            migrationBuilder.DropColumn(
                name: "ProDate",
                table: "Dossier");
        }
    }
}
