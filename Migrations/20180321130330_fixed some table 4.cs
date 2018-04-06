using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixedsometable4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateProFinance",
                table: "DossierDelais",
                newName: "DatePro");

            migrationBuilder.RenameColumn(
                name: "DateOpenAnTechnique",
                table: "DossierDelais",
                newName: "DateOpen");

            migrationBuilder.RenameColumn(
                name: "DateLastChanceAcceptTechnique",
                table: "DossierDelais",
                newName: "DateLastChanceAccept");

            migrationBuilder.RenameColumn(
                name: "DateAvisFinance",
                table: "DossierDelais",
                newName: "DateAvis");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DatePro",
                table: "DossierDelais",
                newName: "DateProFinance");

            migrationBuilder.RenameColumn(
                name: "DateOpen",
                table: "DossierDelais",
                newName: "DateOpenAnTechnique");

            migrationBuilder.RenameColumn(
                name: "DateLastChanceAccept",
                table: "DossierDelais",
                newName: "DateLastChanceAcceptTechnique");

            migrationBuilder.RenameColumn(
                name: "DateAvis",
                table: "DossierDelais",
                newName: "DateAvisFinance");
        }
    }
}
