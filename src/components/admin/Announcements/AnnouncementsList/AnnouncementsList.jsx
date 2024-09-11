import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Title,
  Content,
  TargetGroup,
} from "./AnnouncementsList.style";
import axios from "axios";
import Cookies from 'js-cookie';

const AnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const fetchAnnouncements = async (data) => {
      const {userId} = data
      console.log(userId)

      try {
        const token = Cookies.get('agent-token')
        const response = await axios.get(`http://localhost:22000/api/v1/notifications/getAgentNotifications/${userId}`, {
          headers : {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.data.success){
          const newData = response.data
          setAnnouncements(newData)
        } else {
          console.error("failed to fetch the announcement details")
        }
      } catch(error){
        console.error("An error occurred while fetching the announcemnt details")
      }
    }

    fetchAnnouncements()

  }, [])


  return (
    <List>
      {announcements.map((announcement) => (
        <ListItem key={announcement.id}>
          <Title>{announcement.title}</Title>
          <Content>{announcement.content}</Content>
          <TargetGroup>Target Group: {announcement.targetGroup}</TargetGroup>
        </ListItem>
      ))}
    </List>
  );
};

export default AnnouncementsList;
