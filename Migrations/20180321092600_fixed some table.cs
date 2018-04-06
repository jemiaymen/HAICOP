using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixedsometable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FounisseurDetailID",
                table: "DossierDetail",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Lbl",
                table: "Estimation",
                nullable: false,
                oldClrType: typeof(decimal),
                oldMaxLength: 250);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FounisseurDetailID",
                table: "DossierDetail");

            migrationBuilder.AlterColumn<decimal>(
                name: "Lbl",
                table: "Estimation",
                maxLength: 250,
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
