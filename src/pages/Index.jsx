import React, { useState } from "react";
import { Container, VStack, HStack, Input, Textarea, Button, Select, Box, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [reminder, setReminder] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const toast = useToast();

  const handleAddNote = () => {
    if (title && content && category) {
      const newNote = { title, content, category, reminder };
      if (editIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = newNote;
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, newNote]);
      }
      setTitle("");
      setContent("");
      setCategory("");
      setReminder("");
      toast({
        title: "Note saved.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please fill in all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleEditNote = (index) => {
    const note = notes[index];
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setReminder(note.reminder);
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    toast({
      title: "Note deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Note Widget</Text>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <Select placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
        </Select>
        <Input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} />
        <Button colorScheme="teal" onClick={handleAddNote}>
          {editIndex !== null ? "Update Note" : "Add Note"}
        </Button>
        <VStack spacing={4} width="100%">
          {notes.map((note, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <HStack justifyContent="space-between">
                <VStack align="start">
                  <Text fontSize="lg" fontWeight="bold">
                    {note.title}
                  </Text>
                  <Text>{note.content}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Category: {note.category}
                  </Text>
                  {note.reminder && (
                    <Text fontSize="sm" color="gray.500">
                      Reminder: {new Date(note.reminder).toLocaleString()}
                    </Text>
                  )}
                </VStack>
                <HStack>
                  <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditNote(index)} />
                  <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteNote(index)} />
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
