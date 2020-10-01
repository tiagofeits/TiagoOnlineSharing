using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Tiago.Models.EF
{
    public class TiagoDbContext : DbContext
    {
        public TiagoDbContext() : base("name = TiagoDbContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
    }
}