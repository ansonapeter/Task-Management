package com.example.taskmangaer.Repository;


import com.example.taskmangaer.Models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}

