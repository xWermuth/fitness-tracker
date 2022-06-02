using Microsoft.EntityFrameworkCore;
using Models.User;

namespace Context.User {
    public class UserContext : DbContext 
    {
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
    }
}