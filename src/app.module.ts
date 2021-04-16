import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './—no-spec/tasks/tasks.service';
import { TasksService } from './—-no-spec/tasks/tasks.service';

@Module({
  imports: [TasksModule],
  providers: [TasksService],
})
export class AppModule {}
