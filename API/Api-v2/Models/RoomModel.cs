﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace Api_v2.Models
{
    public class RoomModel
    {
        public Guid Id { get; set; }
        public string RoomName { get; set; }
        private List<MessageModel> _messages;
        public HashSet<Tuple<string, Guid>> Users { get; set; }

        //Trier ailleurs
        public List<MessageModel> Messages
        {
            get => _messages = _messages.OrderBy(x => x.Date).ToList();
            set => _messages = value;
        }


    }
}
