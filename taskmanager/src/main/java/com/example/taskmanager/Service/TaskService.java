package com.example.taskmanager.Service;

import com.example.taskmanager.Models.Task;

import java.util.List;

public interface TaskService {

    List<Task> getAllTasks();

    Task createTask(Task task);

    List<Task> createTasks(List<Task> tasks);

    Task updateTask(Long id, Task task);

    void deleteTask(Long id);
}
