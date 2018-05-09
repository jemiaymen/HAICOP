using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixedsuivmodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Financement",
                table: "Suivie",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FournisseurID",
                table: "Suivie",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Mode",
                table: "Suivie",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "Suivie",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalLocal",
                table: "Suivie",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_Suivie_FournisseurID",
                table: "Suivie",
                column: "FournisseurID");

            migrationBuilder.AddForeignKey(
                name: "FK_Suivie_Fournisseur_FournisseurID",
                table: "Suivie",
                column: "FournisseurID",
                principalTable: "Fournisseur",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Suivie_Fournisseur_FournisseurID",
                table: "Suivie");

            migrationBuilder.DropIndex(
                name: "IX_Suivie_FournisseurID",
                table: "Suivie");

            migrationBuilder.DropColumn(
                name: "Financement",
                table: "Suivie");

            migrationBuilder.DropColumn(
                name: "FournisseurID",
                table: "Suivie");

            migrationBuilder.DropColumn(
                name: "Mode",
                table: "Suivie");

            migrationBuilder.DropColumn(
                name: "Subject",
                table: "Suivie");

            migrationBuilder.DropColumn(
                name: "TotalLocal",
                table: "Suivie");
        }
    }
}
