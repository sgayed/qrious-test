import React from 'react'
import { Person } from './types'

const findSpouse = (data: Person[], parent1: Person): Person | null => {
  for (let p = 0; p < data.length; p++) {
    const parent2 = data[p]

    if (
      parent1.id !== parent2.id &&
      parent1.children.length > 0 &&
      parent2.children.length > 0 &&
      parent1.children.slice().sort().join() === parent2.children.slice().sort().join()
    ) {
      return parent2
    }
  }

  return null
}

const findTopLevelParents = (data: Person[]): Person[] | [] => {
  const parentless = data.filter((person: Person) => person.parents.length === 0)

  for (let p = 0; p < parentless.length; p++) {
    const parent1 = data[p]
    const parent2 = findSpouse(parentless, parent1)

    if (parent1 && parent2) {
      return [parent1, parent2]
    }
  }

  return []
}

const PersonBox = ({ person }: { person: Person | null }) => {
  return person ? (
    <div className={`person ${person.gender}`}>
      {person.name}
    </div>
  ) : null
}

const Children = ({ data, parent }: { data: Person[], parent: Person }) => {
  return (
    <div className="siblings">
      {parent.children.map((childId: number) => {
        const child = data.find((person: Person) => person.id === childId)
        const spouse = child ? findSpouse(data, child) : null

        return child ? (
          <div key={childId}>
            <div className="partners">
              <PersonBox person={child} />
              <PersonBox person={spouse} />
            </div>
            <Children data={data} parent={child} />
          </div>
        ) : null
      })}
    </div>
  )
}

const FamilyTree = ({ data }: { data: Person[] }) => {
  const topLevelParents = findTopLevelParents(data)

  return (
    <div>
      <div className="partners">
        <PersonBox person={topLevelParents[0]} />
        <PersonBox person={topLevelParents[1]} />
      </div>
      <Children data={data} parent={topLevelParents[0]} />
    </div>
  )
}

export default FamilyTree
