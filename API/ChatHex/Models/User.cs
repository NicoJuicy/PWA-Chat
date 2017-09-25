﻿using System;
using System.ComponentModel.DataAnnotations;

namespace ChatHexagone.Models
{
    public class User
    {
        [Key]
        public Guid ClientId { get; set; }
        public string SocketId { get; set; }
        //public PushSubscription PushSubscription { get; set; }
    }
}
