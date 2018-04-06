using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixedsometable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FounisseurDetailID",
                table: "DossierDetail",
                newName: "AcheteurDetailID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AcheteurDetailID",
                table: "DossierDetail",
                newName: "FounisseurDetailID");
        }
    }
}
