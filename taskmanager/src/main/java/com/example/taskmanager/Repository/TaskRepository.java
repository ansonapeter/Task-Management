package com.example.taskmanager.Repository;


import com.example.taskmanager.Models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}

