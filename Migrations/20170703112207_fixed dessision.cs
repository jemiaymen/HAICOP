using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixeddessision : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dessision_Metting_MettingID",
                table: "Dessision");

            migrationBuilder.DropIndex(
                name: "IX_Dessision_MettingID",
                table: "Dessision");

            migrationBuilder.DropColumn(
                name: "MettingID",
                table: "Dessision");

            migrationBuilder.CreateTable(
                name: "DessisionInMetting",
                columns: table => new
                {
                    DessisionID = table.Column<int>(nullable: false),
                    MettingID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DessisionInMetting", x => new { x.DessisionID, x.MettingID });
                    table.ForeignKey(
                        name: "FK_DessisionInMetting_Dessision_DessisionID",
                        column: x => x.DessisionID,
                        principalTable: "Dessision",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DessisionInMetting_Metting_MettingID",
                        column: x => x.MettingID,
                        principalTable: "Metting",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DessisionInMetting_MettingID",
                table: "DessisionInMetting",
                column: "MettingID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DessisionInMetting");

            migrationBuilder.AddColumn<int>(
                name: "MettingID",
                table: "Dessision",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Dessision_MettingID",
                table: "Dessision",
                column: "MettingID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Dessision_Metting_MettingID",
                table: "Dessision",
                column: "MettingID",
                principalTable: "Metting",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
