using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class addcontrainttodossiernumprodatecommissionId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Dossier_ProDate_Num_CommissionID",
                table: "Dossier",
                columns: new[] { "ProDate", "Num", "CommissionID" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Dossier_ProDate_Num_CommissionID",
                table: "Dossier");
        }
    }
}
