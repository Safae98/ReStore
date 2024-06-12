using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options) // exemple des options on a la chaine de conx
        {
        }

        //creation d'"un tableau
        public DbSet<Product> Products {get ; set ;}

    }
}