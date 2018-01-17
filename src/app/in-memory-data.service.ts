import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const wods = [
        { id: 11, name: 'Murph' },
        { id: 12, name: 'Jessie' },
        { id: 13, name: 'Angie' },
        { id: 14, name: 'Karen' },
        { id: 15, name: 'Seven' },
        { id: 16, name: '1RM Bench' },
        { id: 17, name: '21-15-9' },
        { id: 18, name: '1RM Squat' },
        { id: 19, name: 'Laurie' },
        { id: 20, name: '5RM Thruster' }
    ];
    return {wods};
  }
}
