import type { Route } from '../../helpers/town'
import * as d3 from 'd3'
import { useCallback, useEffect, useState } from 'react'
import { townList } from '../../data/town'

type Node = {
  title: string
  x: number
  y: number
  r: number
}

type SvgSvgSelection = d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
type SvgText = d3.Selection<SVGTextElement, unknown, HTMLElement, any>
type SvgCircle = d3.Selection<SVGCircleElement, unknown, HTMLElement, any>

type DirectedGraphProps = {
  routes: Route[]
  width: number
  height: number
}

const DirectedGraph: React.FC<DirectedGraphProps> = ({
  routes,
  width,
  height,
}) => {
  const [svg, setSvg] = useState<SvgSvgSelection>()
  const [nodes, setNodes] = useState<Node[]>([])

  const createLink = useCallback((source: Node, target: Node) => {
    return d3.linkVertical()({
      source: [source.x, source.y],
      target: [target.x, target.y],
    })
  }, [])

  const drawPath = useCallback(
    (link, cost) => {
      const chars = '0123456789ABCDEF'.split('')
      const randomColor = () => {
        let color = '#'
        for (let i = 0; i < 6; i++) {
          color += chars[Math.floor(Math.random() * 16)]
        }
        return color
      }

      const commands = link.split(/(?=[LMC])/)
      const pointArrays = commands.map((d: string) => {
        const pointsArray = d.slice(1, d.length).split(',')
        const pairsArray = []
        for (let i = 0; i < pointsArray.length; i += 2) {
          pairsArray.push([+pointsArray[i], +pointsArray[i + 1]])
        }
        return pairsArray
      })

      const set = new Set<[number, number]>(pointArrays.flat())
      const points: [number, number][] = Array.from(set)
      const lineGenerate = d3
        .line()
        .x((p) => p[0])
        .y((p) => p[1])
        .curve(d3.curveCardinal)
      if (svg) {
        svg
          .append('path')
          .attr('d', lineGenerate(points) as string)
          .attr('stroke', randomColor())
          .attr('stroke-width', cost / 2)
          .attr('fill', 'none')
      }
    },
    [svg]
  )

  const drawCircleAndText = useCallback(
    (x: number, y: number, r: number, text: string) => {
      let circle: SvgCircle
      let title: SvgText
      if (svg) {
        const g = svg.append('g').attr('id', text)
        circle = g
          .append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', r)
          .style('fill', '#34ac9a')

        title = g
          .append('text')
          .attr('dx', x - r / 2.5)
          .attr('dy', y + r / 2.5)
          .text(text)
          .style('fill', 'white')

        return {
          circle,
          title,
        }
      }
      return {}
    },
    [svg]
  )

  // useEffect(() => {
  //   if (svg) {
  //     const markerBoxWidth = 20
  //     const markerBoxHeight = 20
  //     const refX = markerBoxWidth / 2
  //     const refY = markerBoxHeight / 2

  //     svg
  //       .append('defs')
  //       .append('marker')
  //       .attr('id', 'arrow')
  //       .attr('refX', refX - 8)
  //       .attr('refY', refY - 8)
  //       .append('rect')
  //       .attr('width', 5)
  //       .attr('height', 5)
  //   }
  // }, [svg])

  useEffect(() => {
    routes.forEach((route) => {
      const from = nodes.find((node) => node.title === route.from)
      const to = nodes.find((node) => node.title === route.to)
      if (from && to) {
        const link = createLink(from, to)
        drawPath(link, route.cost)
      }
    })
  }, [routes, nodes, createLink, drawPath])

  useEffect(() => {
    const offset = 77
    const circleRadius = 15
    const maxCirclePerRow = 3
    const nodeList = townList.map((town, index) => {
      const plusOneIndex = index + 1
      const factor = maxCirclePerRow * Math.floor(index / maxCirclePerRow)
      const rowFactor = factor / maxCirclePerRow
      const x = plusOneIndex - factor

      return {
        title: town,
        x: x * offset,
        y: rowFactor * offset + 30,
        r: circleRadius,
      }
    })
    setNodes(nodeList)
  }, [routes])

  useEffect(() => {
    if (svg) {
      let circles: SvgCircle[] = []
      nodes.forEach((node) => {
        const { circle } = drawCircleAndText(node.x, node.y, node.r, node.title)
        if (circle) {
          circles = [...circles, circle]
        }
      })
    }
  }, [svg, drawCircleAndText, nodes])

  useEffect(() => {
    const createdSvg = d3
      .select('#graphWrapper')
      .append('svg')
      .attr('viewBox', `0 0 ${width / 2} ${height / 2}`)
      .attr('width', width)
      .attr('height', height)

    setSvg(createdSvg)

    return () => {
      createdSvg.remove()
    }
  }, [width, height])

  return <div id="graphWrapper"></div>
}

export default DirectedGraph
