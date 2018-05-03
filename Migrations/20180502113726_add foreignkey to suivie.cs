using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class addforeignkeytosuivie : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DossierID",
                table: "Suivie",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Suivie_DossierID",
                table: "Suivie",
                column: "DossierID");

            migrationBuilder.AlterColumn<int>(
                name: "Cause",
                table: "Dossier",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Suivie_Dossier_DossierID",
                table: "Suivie",
                column: "DossierID",
                principalTable: "Dossier",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Suivie_Dossier_DossierID",
                table: "Suivie");

            migrationBuilder.DropIndex(
                name: "IX_Suivie_DossierID",
                table: "Suivie");

            migrationBuilder.DropColumn(
                name: "DossierID",
                table: "Suivie");

            migrationBuilder.AlterColumn<int>(
                name: "Cause",
                table: "Dossier",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
