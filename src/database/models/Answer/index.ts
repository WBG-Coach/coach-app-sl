// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {
  date,
  field,
  immutableRelation,
  readonly,
  text,
} from '@nozbe/watermelondb/decorators';

export default class Answer extends Model {
  static table = 'answer';

  static associations = {
    session: {type: 'belongs_to', key: 'session_id'},
  } as const;

  @field('value') value: any;
  @text('teste_id') teste_id: any;
  @text('question_id') question_id: any;
  @text('session_id') session_id: any;
  @immutableRelation('session', 'session_id') session: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
