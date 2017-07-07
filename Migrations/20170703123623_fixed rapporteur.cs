using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixedrapporteur : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppsUser");

            migrationBuilder.CreateTable(
                name: "Rapporteur",
                columns: table => new
                {
                    AgentID = table.Column<int>(nullable: false),
                    DossierID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rapporteur", x => new { x.AgentID, x.DossierID });
                    table.ForeignKey(
                        name: "FK_Rapporteur_Agent_AgentID",
                        column: x => x.AgentID,
                        principalTable: "Agent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rapporteur_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rapporteur_DossierID",
                table: "Rapporteur",
                column: "DossierID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rapporteur");

            migrationBuilder.CreateTable(
                name: "AppsUser",
                columns: table => new
                {
                    AgentID = table.Column<int>(nullable: false),
                    UserID = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppsUser", x => new { x.AgentID, x.UserID });
                    table.ForeignKey(
                        name: "FK_AppsUser_Agent_AgentID",
                        column: x => x.AgentID,
                        principalTable: "Agent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppsUser_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppsUser_UserID",
                table: "AppsUser",
                column: "UserID");
        }
    }
}
