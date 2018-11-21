import React from 'react';
import * as maps from '../svg-maps'
import './SegmentControl.scss'

export default function SegmentControl(props) {
	return(
		<nav className="map-segment-controller">
			<ul>
				<li onClick={() => props.changeMap({name: 'world-svg', svg: maps.world()})}>World</li>
				<li onClick={() => props.changeMap({name: 'europe-svg', svg: maps.europe()})}>Europe</li>
				<li onClick={() => props.changeMap({name: 'north-america-svg', svg: maps.northAmerica()})}>North America</li>
				<li onClick={() => props.changeMap({name: 'south-america-svg', svg: maps.southAmerica()})}>South America</li>
				<li onClick={() => props.changeMap({name: 'asia-svg', svg: maps.asia()})}>Asia</li>
				<li onClick={() => props.changeMap({name: 'oceania-svg', svg: maps.oceania()})}>Oceania</li>
				<li onClick={() => props.changeMap({name: 'africa-svg', svg: maps.africa()})}>Africa</li>
			</ul>
		</nav>
	)
} 