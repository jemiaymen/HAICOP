using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using HAICOP.Data;
using HAICOP.Models;

namespace HAICOP.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20171129134604_add mettingid to mail")]
    partial class addmettingidtomail
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2");

            modelBuilder.Entity("HAICOP.Models.Acheteur", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Lbl")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<string>("LblLong")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.HasKey("ID");

                    b.HasIndex("Lbl")
                        .IsUnique();

                    b.ToTable("Acheteur");
                });

            modelBuilder.Entity("HAICOP.Models.AchInDossier", b =>
                {
                    b.Property<int>("AcheteurID");

                    b.Property<int>("DossierID");

                    b.HasKey("AcheteurID", "DossierID");

                    b.HasIndex("DossierID");

                    b.ToTable("AchInDossier");
                });

            modelBuilder.Entity("HAICOP.Models.Agent", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CommissionID");

                    b.Property<bool>("IsPresident");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<string>("NameFr")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.HasKey("ID");

                    b.HasIndex("CommissionID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Agent");
                });

            modelBuilder.Entity("HAICOP.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255);

                    b.Property<int>("AccessFailedCount");

                    b.Property<bool>("Auto");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstLastName")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(255);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(255);

                    b.Property<int>("Num");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("HAICOP.Models.Commission", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .HasMaxLength(100);

                    b.Property<bool>("HavePresident");

                    b.Property<string>("Lbl")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.Property<string>("LblFr")
                        .HasMaxLength(250);

                    b.HasKey("ID");

                    b.ToTable("Commission");
                });

            modelBuilder.Entity("HAICOP.Models.Dessision", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Lbl")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("ID");

                    b.ToTable("Dessision");
                });

            modelBuilder.Entity("HAICOP.Models.DessisionInMetting", b =>
                {
                    b.Property<int>("DessisionID");

                    b.Property<int>("MettingID");

                    b.HasKey("DessisionID", "MettingID");

                    b.HasIndex("MettingID");

                    b.ToTable("DessisionInMetting");
                });

            modelBuilder.Entity("HAICOP.Models.Dossier", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CommissionID");

                    b.Property<DateTime>("DocDate");

                    b.Property<DateTime>("EnterDate");

                    b.Property<int>("Financement");

                    b.Property<string>("Foreign")
                        .HasMaxLength(250);

                    b.Property<int>("Nature");

                    b.Property<int>("Num");

                    b.Property<DateTime>("ProDate");

                    b.Property<int>("State");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<decimal>("TotalForeign");

                    b.Property<decimal>("TotalLocal");

                    b.Property<DateTime>("TraitDate");

                    b.Property<int>("Type");

                    b.HasKey("ID");

                    b.HasIndex("CommissionID");

                    b.ToTable("Dossier");
                });

            modelBuilder.Entity("HAICOP.Models.ForeignInvestisseur", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("ID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("ForeignInvestisseur");
                });

            modelBuilder.Entity("HAICOP.Models.FourInDossier", b =>
                {
                    b.Property<int>("FournisseurID");

                    b.Property<int>("DossierID");

                    b.Property<bool>("Foreign");

                    b.Property<string>("Lbl")
                        .HasMaxLength(200);

                    b.Property<decimal>("Montant");

                    b.HasKey("FournisseurID", "DossierID");

                    b.HasAlternateKey("DossierID", "FournisseurID");

                    b.ToTable("FourInDossier");
                });

            modelBuilder.Entity("HAICOP.Models.Fournisseur", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Lbl")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("ID");

                    b.HasIndex("Lbl")
                        .IsUnique();

                    b.ToTable("Fournisseur");
                });

            modelBuilder.Entity("HAICOP.Models.InvInDossier", b =>
                {
                    b.Property<int>("ForeignInvestisseurID");

                    b.Property<int>("DossierID");

                    b.HasKey("ForeignInvestisseurID", "DossierID");

                    b.HasAlternateKey("DossierID", "ForeignInvestisseurID");

                    b.ToTable("InvInDossier");
                });

            modelBuilder.Entity("HAICOP.Models.Mail", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Desc")
                        .HasMaxLength(500);

                    b.Property<int>("DossierID");

                    b.Property<string>("From")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<DateTime>("MailDate");

                    b.Property<int>("MailNature");

                    b.Property<int>("MailType");

                    b.Property<int>("MettingID");

                    b.Property<string>("OriginRef")
                        .HasMaxLength(20);

                    b.Property<string>("Ref")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("Url");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Mail");
                });

            modelBuilder.Entity("HAICOP.Models.Metting", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DossierID");

                    b.Property<DateTime>("MettDate");

                    b.Property<string>("MettDesc")
                        .HasMaxLength(500);

                    b.Property<int>("MettNbr");

                    b.Property<DateTime>("NotifDate");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Metting");
                });

            modelBuilder.Entity("HAICOP.Models.Rapporteur", b =>
                {
                    b.Property<int>("AgentID");

                    b.Property<int>("DossierID");

                    b.HasKey("AgentID", "DossierID");

                    b.HasIndex("DossierID");

                    b.ToTable("Rapporteur");
                });

            modelBuilder.Entity("HAICOP.Models.UserAgent", b =>
                {
                    b.Property<string>("UserID")
                        .HasMaxLength(255);

                    b.Property<int>("AgentID");

                    b.HasKey("UserID", "AgentID");

                    b.HasAlternateKey("AgentID", "UserID");

                    b.ToTable("UserAgent");
                });

            modelBuilder.Entity("HAICOP.Models.UserCommission", b =>
                {
                    b.Property<string>("UserID")
                        .HasMaxLength(255);

                    b.Property<int>("CommissionID");

                    b.HasKey("UserID", "CommissionID");

                    b.HasAlternateKey("CommissionID", "UserID");

                    b.ToTable("UserCommission");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255);

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityRole");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(255);

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(255);

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasMaxLength(255);

                    b.Property<string>("RoleId")
                        .HasMaxLength(255);

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasMaxLength(255);

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("HAICOP.Models.ApplicationRole", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole");

                    b.Property<string>("Description")
                        .HasMaxLength(255);

                    b.ToTable("ApplicationRole");

                    b.HasDiscriminator().HasValue("ApplicationRole");
                });

            modelBuilder.Entity("HAICOP.Models.AchInDossier", b =>
                {
                    b.HasOne("HAICOP.Models.Acheteur", "Acheteur")
                        .WithMany()
                        .HasForeignKey("AcheteurID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Agent", b =>
                {
                    b.HasOne("HAICOP.Models.Commission", "Commission")
                        .WithMany("Agents")
                        .HasForeignKey("CommissionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.DessisionInMetting", b =>
                {
                    b.HasOne("HAICOP.Models.Dessision", "Dessision")
                        .WithMany()
                        .HasForeignKey("DessisionID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.Metting", "Metting")
                        .WithMany()
                        .HasForeignKey("MettingID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Dossier", b =>
                {
                    b.HasOne("HAICOP.Models.Commission", "Commission")
                        .WithMany("Dossiers")
                        .HasForeignKey("CommissionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.FourInDossier", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.Fournisseur", "Fournisseur")
                        .WithMany()
                        .HasForeignKey("FournisseurID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.InvInDossier", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.ForeignInvestisseur", "ForeignInvestisseur")
                        .WithMany()
                        .HasForeignKey("ForeignInvestisseurID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Mail", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany("Mails")
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Metting", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany("Mettings")
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Rapporteur", b =>
                {
                    b.HasOne("HAICOP.Models.Agent", "Agent")
                        .WithMany()
                        .HasForeignKey("AgentID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.UserAgent", b =>
                {
                    b.HasOne("HAICOP.Models.Agent", "Agent")
                        .WithMany()
                        .HasForeignKey("AgentID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.UserCommission", b =>
                {
                    b.HasOne("HAICOP.Models.Commission", "Commission")
                        .WithMany()
                        .HasForeignKey("CommissionID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("HAICOP.Models.ApplicationUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("HAICOP.Models.ApplicationUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.ApplicationUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
