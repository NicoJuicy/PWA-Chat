﻿using ChatHexagone.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiCore
{
    public static class DataMapping
    {
        public static void ConfigureMappings(ModelBuilder modelBuilder)
        {
            MapEntityDbEntry(modelBuilder);
        }

        private static void MapEntityDbEntry(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Channel>().ToTable("Channels");
            modelBuilder.Entity<User>().ToTable("Users");
        }
    }
}
