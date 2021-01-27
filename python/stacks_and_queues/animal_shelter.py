"""
question:
An animal shelter, which holds only dogs and cats, operates on a strictly"first in, first out" basis. People must
adopt either the "oldest" (based on arrival time) of all animals at the shelter, or they can select whether they
would prefer a dog or a cat (and will receive the oldest animal of that type). They cannot select which specific
animal they would like. Create the data structures to maintain this system and implement operations such as enqueue,
dequeueAny, dequeueDog, and dequeueCat. You may use the built-in Linkedlist data structure.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 239.
"""


class Queue:

    def __init__(self):
        self.data = []

    def enqueue(self, item):
        self.data.insert(0, item)

    def dequeue(self):
        return self.data.pop()

    def peek(self):
        return self.data[-1]


class Animal:

    def __init__(self, name):
        self.name = name


class Cat(Animal):

    def __init__(self, name=''):
        Animal.__init__(self, name)


class Dog(Animal):

    def __init__(self, name=''):
        Animal.__init__(self, name)


class AnimalShelter:

    def __init__(self):

        self.q1 = Queue()
        self.q2 = Queue()

    def __str__(self):

        return '-> [ {}] ->'.format(''.join([dog.name + ' ' for dog in a.get_queue().data]))

    def get_queue(self):
        """ get active queue """

        if self.q2.data:
            return self.q2
        else:
            return self.q1

    def get_buffer(self):
        """ get empty buffer queue """

        if self.q2.data:
            return self.q1
        else:
            return self.q2

    def enqueue(self, animal):
        """ put animal in queue """

        q = self.get_queue()
        q.enqueue(animal)

    def dequeue_any(self):
        """ dequeue next animal regardless of type """

        q = self.get_queue()
        return q.dequeue()

    @staticmethod
    def get_next_of_type(q, buffer, animal_type):
        """ get next animal of type animal_type from queue and move rest to buffer """

        # move animals into buffer until find one of right type
        while q.data:
            next_animal = q.peek()
            if type(next_animal) == animal_type:
                next_of_type = q.dequeue()
                break
            else:
                buffer.enqueue(q.dequeue())

        # move rest of animals into buffer
        while q.data:
            buffer.enqueue(q.dequeue())

        return next_of_type

    def dequeue_cat(self):
        """ remove next cat from queue """

        q = self.get_queue()
        buf = self.get_buffer()
        return self.get_next_of_type(q, buf, Cat)

    def dequeue_dog(self):
        """ remove next dog from queue """

        q = self.get_queue()
        buf = self.get_buffer()
        return self.get_next_of_type(q, buf, Dog)


"""
test
"""
if __name__ == '__main__':

    #  ----------------------
    #  --> c2 c1 d3 d2 d1 -->
    #  ----------------------

    a = AnimalShelter()

    a.enqueue(Dog('d1'))
    a.enqueue(Dog('d2'))
    a.enqueue(Dog('d3'))
    a.enqueue(Cat('c1'))
    a.enqueue(Cat('c2'))

    print(a)
    assert a.dequeue_any().name == 'd1'
    print(a)
    assert a.dequeue_cat().name == 'c1'
    print(a)
    assert a.dequeue_any().name == 'd2'
    print(a)
    assert a.dequeue_dog().name == 'd3'
    print(a)
    assert a.dequeue_any().name == 'c2'
    print(a)


