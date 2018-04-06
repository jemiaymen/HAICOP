using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class addsuivietable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Suivie",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    ContractualTerm = table.Column<int>(nullable: false),
                    DateAcceptationFinale = table.Column<DateTime>(nullable: false),
                    DateAdmissionProvisoire = table.Column<DateTime>(nullable: false),
                    DateDebu = table.Column<DateTime>(nullable: false),
                    DateFichierJointFinal = table.Column<DateTime>(nullable: false),
                    DateMotifsAnnulation = table.Column<string>(nullable: true),
                    DateTraveau = table.Column<DateTime>(nullable: false),
                    DeclarationMethodes = table.Column<string>(nullable: false),
                    DossierID = table.Column<int>(nullable: false),
                    EvaluationAcheteur = table.Column<string>(maxLength: 500, nullable: true),
                    FinalGuaranteeM = table.Column<decimal>(nullable: false),
                    FinalGuaranteeP = table.Column<decimal>(nullable: false),
                    MontantPenalitesFournisseur = table.Column<decimal>(nullable: false),
                    MontantPenalitesRetard = table.Column<decimal>(nullable: false),
                    NaturePrice = table.Column<int>(nullable: false),
                    NombreJoursRetard = table.Column<int>(nullable: false),
                    StatementReasonsDates = table.Column<string>(maxLength: 500, nullable: true),
                    TitleGuaranteeM = table.Column<decimal>(nullable: false),
                    TitleGuaranteeP = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suivie", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Suivie_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Suivie_DossierID",
                table: "Suivie",
                column: "DossierID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Suivie");
        }
    }
}
