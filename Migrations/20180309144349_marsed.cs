using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class marsed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AcheteurDetail",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AcheteurID = table.Column<int>(nullable: false),
                    Fax = table.Column<string>(nullable: false),
                    FirstLastName = table.Column<string>(maxLength: 500, nullable: false),
                    Tel = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcheteurDetail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AcheteurDetail_Acheteur_AcheteurID",
                        column: x => x.AcheteurID,
                        principalTable: "Acheteur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Balance",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    CritereComplex = table.Column<string>(maxLength: 250, nullable: true),
                    CritereImportance = table.Column<string>(maxLength: 250, nullable: true),
                    DossierID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Balance", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Balance_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Concurrence",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    DossierID = table.Column<int>(nullable: false),
                    NbrChaier = table.Column<int>(nullable: false),
                    NbrOffre = table.Column<int>(nullable: false),
                    NbrOffreFinance = table.Column<int>(nullable: false),
                    NbrSuppBeforeFinance = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Concurrence", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Concurrence_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DossierDelais",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    DateAnConc = table.Column<DateTime>(nullable: false),
                    DateAvisFinance = table.Column<DateTime>(nullable: false),
                    DateAvisTech = table.Column<DateTime>(nullable: false),
                    DateDebu = table.Column<DateTime>(nullable: false),
                    DateLastChanceAcceptTechnique = table.Column<DateTime>(nullable: false),
                    DateOpenAnFinance = table.Column<DateTime>(nullable: false),
                    DateOpenAnTechnique = table.Column<DateTime>(nullable: false),
                    DateProFinance = table.Column<DateTime>(nullable: false),
                    DateProTech = table.Column<DateTime>(nullable: false),
                    DateTraveau = table.Column<DateTime>(nullable: false),
                    DelaiTraveau = table.Column<string>(maxLength: 500, nullable: false),
                    DossierID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DossierDelais", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DossierDelais_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DossierDetail",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    DossierID = table.Column<int>(nullable: false),
                    IsSmall = table.Column<bool>(nullable: false),
                    Nature = table.Column<int>(nullable: false),
                    NbrLot = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DossierDetail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DossierDetail_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Estimation",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    DossierID = table.Column<int>(nullable: false),
                    Lbl = table.Column<decimal>(maxLength: 250, nullable: false),
                    Montant = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estimation", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Estimation_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FournisseurDetail",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Activity = table.Column<string>(nullable: false),
                    Category = table.Column<string>(nullable: true),
                    FournisseurID = table.Column<int>(nullable: false),
                    Nationalite = table.Column<string>(nullable: false),
                    Speciality = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FournisseurDetail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_FournisseurDetail_Fournisseur_FournisseurID",
                        column: x => x.FournisseurID,
                        principalTable: "Fournisseur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InfoValeur",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Description = table.Column<string>(maxLength: 500, nullable: true),
                    DossierID = table.Column<int>(nullable: false),
                    MethodPrice = table.Column<int>(nullable: false),
                    NaturePrice = table.Column<int>(nullable: false),
                    NbrFinance = table.Column<int>(nullable: false),
                    NbrTech = table.Column<int>(nullable: false),
                    TotalEstimation = table.Column<decimal>(nullable: false),
                    Valeur = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InfoValeur", x => x.ID);
                    table.ForeignKey(
                        name: "FK_InfoValeur_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Moinsdis",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Critere = table.Column<string>(maxLength: 250, nullable: true),
                    DossierID = table.Column<int>(nullable: false),
                    NbrConform = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Moinsdis", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Moinsdis_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AcheteurDetail_AcheteurID",
                table: "AcheteurDetail",
                column: "AcheteurID");

            migrationBuilder.CreateIndex(
                name: "IX_Balance_DossierID",
                table: "Balance",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_Concurrence_DossierID",
                table: "Concurrence",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_DossierDelais_DossierID",
                table: "DossierDelais",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_DossierDetail_DossierID",
                table: "DossierDetail",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_Estimation_DossierID",
                table: "Estimation",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_FournisseurDetail_FournisseurID",
                table: "FournisseurDetail",
                column: "FournisseurID");

            migrationBuilder.CreateIndex(
                name: "IX_InfoValeur_DossierID",
                table: "InfoValeur",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_Moinsdis_DossierID",
                table: "Moinsdis",
                column: "DossierID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AcheteurDetail");

            migrationBuilder.DropTable(
                name: "Balance");

            migrationBuilder.DropTable(
                name: "Concurrence");

            migrationBuilder.DropTable(
                name: "DossierDelais");

            migrationBuilder.DropTable(
                name: "DossierDetail");

            migrationBuilder.DropTable(
                name: "Estimation");

            migrationBuilder.DropTable(
                name: "FournisseurDetail");

            migrationBuilder.DropTable(
                name: "InfoValeur");

            migrationBuilder.DropTable(
                name: "Moinsdis");
        }
    }
}
