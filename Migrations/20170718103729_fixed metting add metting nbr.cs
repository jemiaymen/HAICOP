using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixedmettingaddmettingnbr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DocDate",
                table: "Metting",
                newName: "MettDate");

            migrationBuilder.AddColumn<int>(
                name: "MettNbr",
                table: "Metting",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MettDate",
                table: "Metting",
                newName: "DocDate");

            migrationBuilder.DropColumn(
                name: "MettNbr",
                table: "Metting");

            migrationBuilder.AlterColumn<string>(
                name: "Lbl",
                table: "FourInDossier",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);
        }
    }
}
