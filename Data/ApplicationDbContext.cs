using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using HAICOP.Models;

namespace HAICOP.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>(entity => entity.Property(m => m.Id)
                .HasMaxLength(255));
            builder.Entity<ApplicationUser>(entity => entity.Property(m => m.NormalizedEmail)
                .HasMaxLength(255));
            builder.Entity<ApplicationUser>(entity => entity.Property(m => m.NormalizedUserName)
                .HasMaxLength(255));
            builder.Entity<ApplicationUser>(entity => entity.Property(m => m.FirstLastName)
                .HasMaxLength(255));

            builder.Entity<ApplicationRole>(entity => entity.Property(m => m.Id)
                .HasMaxLength(255));
            builder.Entity<ApplicationRole>(entity => entity.Property(m => m.NormalizedName)
                .HasMaxLength(255));
            builder.Entity<ApplicationRole>(entity => entity.Property(m => m.Description)
                .HasMaxLength(255));
            builder.Entity<ApplicationRole>(entity => entity.Property(m => m.Name)
                .HasMaxLength(255));

            builder.Entity<IdentityUserLogin<string>>(entity => entity.Property(m => m.LoginProvider)
                .HasMaxLength(255));
            builder.Entity<IdentityUserLogin<string>>(entity => entity.Property(m => m.ProviderKey)
                .HasMaxLength(255));
            builder.Entity<IdentityUserLogin<string>>(entity => entity.Property(m => m.UserId)
                .HasMaxLength(255));
            
            builder.Entity<IdentityUserRole<string>>(entity => entity.Property(m => m.UserId)
                .HasMaxLength(255));
            builder.Entity<IdentityUserRole<string>>(entity => entity.Property(m => m.RoleId)
                .HasMaxLength(255));
            
            builder.Entity<IdentityUserToken<string>>(entity => entity.Property(m => m.UserId)
                .HasMaxLength(255));
            builder.Entity<IdentityUserToken<string>>(entity => entity.Property(m => m.LoginProvider)
                .HasMaxLength(255));
            builder.Entity<IdentityUserToken<string>>(entity => entity.Property(m => m.Name)
                .HasMaxLength(255));
            
            builder.Entity<IdentityUserClaim<string>>(entity => entity.Property(m => m.UserId)
                .HasMaxLength(255));
            builder.Entity<IdentityRoleClaim<string>>(entity => entity.Property(m => m.RoleId)
                .HasMaxLength(255));
            
            builder.Entity<Agent>(entity => entity.Property(m => m.Name)
                    .HasMaxLength(255));

            builder.Entity<Agent>()
                    .HasIndex(c => c.Name)
                    .IsUnique();
            
            
            builder.Entity<ForeignInvestisseur>(entity => entity.Property(m => m.Name)
                    .HasMaxLength(255));
            builder.Entity<ForeignInvestisseur>()
                    .HasIndex(c => c.Name)
                    .IsUnique();
            builder.Entity<Acheteur>(entity => entity.Property(m => m.Lbl)
                    .HasMaxLength(255));
            builder.Entity<Acheteur>()
                    .HasIndex(c => c.Lbl)
                    .IsUnique();
            builder.Entity<Fournisseur>(entity => entity.Property(m => m.Lbl)
                    .HasMaxLength(255));
            builder.Entity<Fournisseur>()
                    .HasIndex(c => c.Lbl)
                    .IsUnique();
            
            builder.Entity<AchInDossier>()
                    .HasKey(c => new {c.AcheteurID , c.DossierID});
            
            builder.Entity<FourInDossier>()
                    .HasKey(c => new {c.FournisseurID , c.DossierID});
            
            builder.Entity<Rapporteur>()
                    .HasKey(c => new {c.AgentID , c.DossierID});

            builder.Entity<InvInDossier>()
                    .HasKey(c => new {c.ForeignInvestisseurID , c.DossierID});
            
            builder.Entity<DessisionInMetting>()
                    .HasKey(c => new {c.DessisionID , c.MettingID});



            builder.Entity<UserAgent>(entity => entity.Property(m => m.UserID)
                .HasMaxLength(255));
            
            builder.Entity<UserCommission>(entity => entity.Property(m => m.UserID)
                .HasMaxLength(255));


            builder.Entity<UserAgent>()
                    .HasKey(c => new {c.UserID , c.AgentID});

            builder.Entity<UserCommission>()
                    .HasKey(c => new {c.UserID, c.CommissionID});

            builder.Entity<Dossier>()
                    .HasIndex(c => new { c.ProDate , c.Num , c.CommissionID})
                    .IsUnique();

            builder.Entity<Member>()
                    .HasKey(c => c.ID);








        }


        public DbSet<Dossier> Dossier {get ; set;}
        public DbSet<Mail> Mail {get ; set;}
        public DbSet<Dessision> Dessision {get ; set;}
        public DbSet<Fournisseur> Fournisseur {get ; set;}
        public DbSet<Acheteur> Acheteur {get ; set;}
        public DbSet<Metting> Metting {get ; set;}
        public DbSet<Commission> Commission {get ; set;}
        public DbSet<Agent> Agent {get ; set;}
        public DbSet<Rapporteur> Rapporteur {get ; set;}
        public DbSet<ForeignInvestisseur> ForeignInvestisseur { get ; set; }
        public DbSet<InvInDossier> InvInDossier { get ; set; }
        public DbSet<ApplicationRole> ApplicationRole { get; set; }
        public DbSet<AchInDossier> AchInDossier { get; set; }
        public DbSet<FourInDossier> FourInDossier { get; set; }
        public DbSet<DessisionInMetting> DessisionInMetting { get; set; }

        public DbSet<UserAgent> UserAgent {get ; set;}
        public DbSet<UserCommission> UserCommission {get ; set;}
        public DbSet<NextNum> NextNum { get; set; }
        public DbSet<Desc> Desc { get; set; }




        public DbSet<Guest> Guest { get; set; }
        public DbSet<Member> Member { get; set; }
        public DbSet<Document> Document { get; set; }
        public DbSet<Encour> Encour { get; set; }
        public DbSet<OJ> OJ { get; set; }
        public DbSet<Invite> Invite { get; set; }
        public DbSet<DocInOJ> DocInOJ { get; set; }


        public DbSet<AcheteurDetail> AcheteurDetail { get; set; }
        public DbSet<FournisseurDetail> FournisseurDetail { get; set; }
        public DbSet<DossierDetail> DossierDetail { get; set; }
        public DbSet<DossierDelais> DossierDelais { get; set; }
        public DbSet<Concurrence> Concurrence { get; set; }
        public DbSet<InfoValeur> InfoValeur { get; set; }
        public DbSet<Estimation> Estimation { get; set; }
        public DbSet<Moinsdis> Moinsdis { get; set; }
        public DbSet<Balance> Balance { get; set; }
        public DbSet<Suivie> Suivie { get; set; }
        public DbSet<AffectTrend> AffectTrend { get; set; }
        

    }
}
