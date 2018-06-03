import { TextNode } from './nodes/textnode'
import { Comment } from './nodes/comment'
import { Element } from './elements/element'
import { Widget } from './elements/widget'
import * as elements from './elements'

export default { TextNode, Comment, Element, Widget, ...elements, elements }
